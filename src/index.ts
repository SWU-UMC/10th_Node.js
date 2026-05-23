import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { AppError } from "./common/errors/app.error";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { success } from "./common/responses/response.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);

const app: Express = express();
const port = process.env.PORT || 3000;

type AuthenticatedUser = {
  id: number;
  email: string;
  name: string;
};

app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = null, message = null, data = null }) {
    return this.json({
      resultType: "FAIL",
      error: {
        errorCode,
        reason: message,
        data,
      },
      success: null,
    });
  };
  next();
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
  (req: Request, res: Response) => {
    res.status(200).json({ success: true, tokens: req.user });
  },
);

const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req: Request, res: Response) => {
  const user = req.user as AuthenticatedUser | undefined;

  if (!user) {
    return res.status(401).json({
      resultType: "FAIL",
      error: {
        errorCode: "UNAUTHORIZED",
        reason: "인증이 필요합니다.",
        data: null,
      },
      success: null,
    });
  }

  return res.status(200).json(
    success({
      message: `인증 성공! ${user.name}님의 마이페이지입니다.`,
      user,
    }),
  );
});

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve("dist/swagger.json"), "utf8"),
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    message: err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});
