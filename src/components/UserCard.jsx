const UserCard = ({ user }) => {
    const { firstName, lastName, age, photoUrl, gender, emailId } = user;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
                <figure>
                    <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-60 object-cover"
                    />
                </figure>
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {firstName} {lastName}
                    </h2>
                    <p className="text-gray-600 mb-1"><strong>Age:</strong> {age || "N/A"}</p>
                    <p className="text-gray-600 mb-1"><strong>Gender:</strong> {gender || "N/A"}</p>
                    <p className="text-gray-600 mb-4"><strong>Email:</strong> {emailId}</p>

                    <div className="flex justify-between space-x-4">
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300">
                            Interested
                        </button>
                        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                            Ignore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
