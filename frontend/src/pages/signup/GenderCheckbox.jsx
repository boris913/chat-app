const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
    return (
        <div className='flex p-2'>
            <div className='form-control border border-blue-400 rounded-md mr-4'>
                <label
                    className={`label gap-2 cursor-pointer ${
                        selectedGender === "male" ? "bg-blue-500 text-white" : ""
                    }`}
                >
                    <span className='label-text'>Homme</span>
                    <input
                        type='checkbox'
                        className='checkbox border-blue-500'
                        checked={selectedGender === "male"}
                        onChange={() => onCheckboxChange("male")}
                    />
                </label>
            </div>
            <div className='form-control ml-4 border border-pink-400 rounded-md'>
                <label
                    className={`label gap-2 cursor-pointer ${
                        selectedGender === "female" ? "bg-pink-500 text-white" : ""
                    }`}
                >
                    <span className='label-text'>Femme</span>
                    <input
                        type='checkbox'
                        className='checkbox border-pink-500'
                        checked={selectedGender === "female"}
                        onChange={() => onCheckboxChange("female")}
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;

// STARTER CODE FOR THIS FILE
// const GenderCheckbox = () => {
// 	return (
// 		<div className='flex'>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Male</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 			<div className='form-control'>
// 				<label className={`label gap-2 cursor-pointer`}>
// 					<span className='label-text'>Female</span>
// 					<input type='checkbox' className='checkbox border-slate-900' />
// 				</label>
// 			</div>
// 		</div>
// 	);
// };
// export default GenderCheckbox;
