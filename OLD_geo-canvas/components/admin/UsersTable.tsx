import React from 'react';

// Define a type for the mock user data for clarity
interface MockUser {
    id: string;
    name: string;
    email: string;
    registrationDate: string;
    listingCount: number;
}

interface UsersTableProps {
    users: MockUser[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Όνομα</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ημ/νία Εγγραφής</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Αρ. Καταχωρήσεων</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.registrationDate).toLocaleDateString('el-GR')}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{user.listingCount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button className="text-indigo-600 hover:text-indigo-900">Προβολή</button>
                                <button className="text-red-600 hover:text-red-900">Διαγραφή</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;