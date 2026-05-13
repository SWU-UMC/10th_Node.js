// user.response.dto.ts
export const responseFromUser = ({ user, preferences, }) => {
    return {
        email: user.email,
        name: user.name,
        preferCategory: preferences.map((p) => p.name),
    };
};
//# sourceMappingURL=user.response.dto.js.map