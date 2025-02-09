import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(() => {
		const user = JSON.parse(localStorage.getItem("chat-user")) || null;
		// Assurez-vous que l'utilisateur est marqué comme en ligne s'il est connecté
		if (user) {
			return { ...user, isOnline: true }; // Ajoutez isOnline ici
		}
		return null;
	});

	// Optionnel : Mettez à jour l'état de l'utilisateur en fonction de la connexion/déconnexion
	useEffect(() => {
		const handleOnline = () => {
			if (authUser) {
				setAuthUser((prev) => ({ ...prev, isOnline: true }));
			}
		};

		const handleOffline = () => {
			if (authUser) {
				setAuthUser((prev) => ({ ...prev, isOnline: false }));
			}
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, [authUser]);

	// Assurez-vous que l'utilisateur est authentifié à chaque chargement de la page
	useEffect(() => {
		const fetchAuthUser = async () => {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const response = await axios.get('http://localhost:5000/api/auth/me', {
						headers: { Authorization: `Bearer ${token}` },
					});
					setAuthUser(response.data);
				} catch (error) {
					console.error('Erreur lors de la récupération des informations utilisateur', error);
					localStorage.removeItem('token'); // Supprime le token invalide
					setAuthUser(null);
				}
			}
		};

		fetchAuthUser();
	}, []);

	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};