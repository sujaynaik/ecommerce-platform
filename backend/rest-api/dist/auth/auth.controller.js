import { AuthService } from "./auth.service.js";
const authService = new AuthService();
export class AuthController {
    async login(req, res) {
        try {
            const response = await authService.login(req.body);
            return res.json(response);
        }
        catch {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const response = await authService.refreshToken({
                refreshToken: req.body.refreshToken,
            });
            res.json(response);
        }
        catch (error) {
            res.status(401).json({
                message: "Invalid refresh token",
            });
        }
    }
    me(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            console.log("No bearer token");
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        res.json({
            id: req.user.id,
            name: "Commerce Admin",
            email: req.user.email,
        });
    }
}
