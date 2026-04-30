export const responseFromUser = ({
  user,
  preferences,
}: {
  user: any;
  preferences: any[];
}) => {
  return {
    email: user.email,
    name: user.name,
    preferCategory: preferences.map((p) => p.name),
  };
};