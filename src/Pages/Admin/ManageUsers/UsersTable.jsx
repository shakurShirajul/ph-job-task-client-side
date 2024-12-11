const UsersTable = ({ user, updateUserRole }) => {
    return <>
        <tr className="font-mulish">
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={user.user_image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>

            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{user.user_name}</div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{user.user_email}</div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold capitalize">{user.user_role}</div>
                </div>
            </td>
            <td>
                {
                    user.user_role === "user" ? <button onClick={() => updateUserRole(user._id, "admin")} className="btn btn-success text-white">Promote</button> : <button onClick={() => updateUserRole(user._id, "user") }className="btn btn-error text-white">Demote</button>
                }
            </td>
        </tr>
    </>
}

export default UsersTable;