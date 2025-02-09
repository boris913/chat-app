import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
// Contrôleur pour mettre à jour les informations de l'utilisateur connecté
export const updateUserProfile = async (req, res) => {
    try {
        const { fullName, profilePic } = req.body;
        const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié et que son id est disponible

        // Mise à jour de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, profilePic },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
