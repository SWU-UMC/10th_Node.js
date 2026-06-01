import dotenv from "dotenv";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./db.config.js";

dotenv.config();

type AuthUser = {
  id: number;
  email: string;
  name: string;
};

type TokenUser = Pick<AuthUser, "id" | "email">;

const userSelect = {
  id: true,
  email: true,
  name: true,
} as const;

const defaultOAuthUserData = {
  gender: "TEMP",
  birth: new Date("1900-01-01T00:00:00.000Z"),
  address: "GOOGLE_LOGIN_TEMP_ADDRESS",
  detailAddress: null,
  phoneNumber: "000-0000-0000",
};

export const generateAccessToken = (user: TokenUser) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );
};

export const generateRefreshToken = (user: Pick<AuthUser, "id">) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "14d" },
  );
};

const googleVerify = async (profile: Profile): Promise<AuthUser> => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google profile does not include an email.");
  }

  const displayName = profile.displayName || email.split("@")[0] || "Google User";

  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: displayName,
      ...defaultOAuthUserData,
    },
    select: userSelect,
  });
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID!,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET!,
    callbackURL: "/oauth2/callback/google",
    scope: ["email", "profile"],
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      const tokens = {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      };

      return cb(null, tokens);
    } catch (err) {
      return cb(err as Error);
    }
  },
);

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  },
  async (payload: JwtPayload, done) => {
    try {
      const userId = Number(payload.id);

      if (!Number.isInteger(userId)) {
        return done(null, false);
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: userSelect,
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  },
);
