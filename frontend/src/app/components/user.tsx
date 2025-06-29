import { useEffect, useState } from "react";

// 👇 Define the User type based on your backend model
interface User {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]); // 👈 Typed array of users

  useEffect(() => {
    fetch("https://blogbackend-production-8b57.up.railway.app/api/users") // ✅ replace with real backend URL
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Registered Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow">
            <img
              src={user.image_url}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <p className="mt-2 font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.id}</p>
            <p className="text-xs text-gray-400">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
