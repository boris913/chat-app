import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    S&apos;inscrire <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom complet</span>
                        </label>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full input input-bordered h-10 bg-gray-800 text-gray-200 placeholder:text-gray-500 placeholder:italic placeholder:text-sm'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Nom d&apos;utilisateur</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10 bg-gray-800 text-gray-200 placeholder:text-gray-500 placeholder:italic placeholder:text-sm'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Mot de passe</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Entrer le mot de passe'
                            className='w-full input input-bordered h-10 bg-gray-800 text-gray-200 placeholder:text-gray-500 placeholder:italic placeholder:text-sm'
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Confirmer le mot de passe</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Confirmer le mot de passe'
                            className='w-full input input-bordered h-10 bg-gray-800 text-gray-200 placeholder:text-gray-500 placeholder:italic placeholder:text-sm'
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

                    <Link
                        to={"/login"}
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
                    >
                        Vous avez déjà un compte ?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-sm mt-2 bg-blue-600 hover:bg-blue-700 text-white' disabled={loading}>
                            {loading ? <span className='loading loading-spinner text-blue-500'></span> : "S'inscrire"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;