import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Pagination />
    </div>
  );
}

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api?results=20");
        const cleanData = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          email: user.email,
          id: crypto.randomUUID(),
        }));
        setUsers(cleanData);
      } catch (error) {
        console.log("Veri alırken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <Pages content={users} itemsPerPage={itemsPerPage} />
      )}
    </div>
  );
};

const Pages = ({ content, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(content.length / itemsPerPage);

  const currentUsers = content.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-20 py-2">Name</th>
            <th className="px-7 py-2">Age</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <ul className="inline-flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => setCurrentPage(number)}
                className={`px-2 py-2 text-purple-500 ${currentPage === number ? "font-bold" : ""}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
