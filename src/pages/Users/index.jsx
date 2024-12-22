/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./inde.css";
import { FaSearch, FaRegPaperPlane, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../../components/Loader";
import { useEffect, useState } from "react";
import { getUsers, getUsersbyName } from "../../services/users";
import { resetFilter } from "../../services/posts";
export default function Users() {
  const [reload, setReload] = useState(false);
  const [users, setUsers] = useState([]);
  const nav = useNavigate();
  const [isLoad, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLasPage] = useState(1);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
      offset: 10,
    });
  }, []);
  useEffect(() => {
    async function get() {
      if (filter.length > 0) {
        const response = await getUsersbyName(page, 10, filter);
        if (page != 1) {
          const newList = response?.data.data;
          setUsers((prev) => [...prev, ...newList]);
          setLasPage((prev) => response?.data.laspage);
          return;
        }
        setUsers((prev) => response?.data?.data);
        setLasPage((prev) => response?.data.laspage);
        return;
      }
      const response = await getUsers(page, 10);
      if (page > 1) {
        const newList = response?.data.data;
        setUsers((prev) => [...prev, ...newList]);
        return;
      }
      setUsers(response?.data?.data);
      setLasPage(response?.data.laspage);
    }
    get();

    if (page == 1) {
      setLoad(true);
    }

    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, [page, reload]);

  return (
    <section id="users">
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPage((prev) => 1);
                setReload((prev) => !prev);
              }}
            >
              <div>
                <input
                  placeholder="Pesquise pelo nome"
                  onChange={(e) => {
                    setFilter((prev) => e.target.value);
                  }}
                  value={filter}
                />
                <button>
                  <FaSearch />
                </button>
              </div>
              {filter.length != 0 && (
                <button
                  onClick={() => {
                    resetFilter(setFilter, setReload, setPage);
                  }}
                >
                  <FaSync />
                </button>
              )}
            </form>
          </div>
          <article>
            {users?.length > 0 &&
              users?.map((user, index) => (
                <figure key={index} data-aos="fade-right" style={{
                  display : localStorage.getItem("uuid") == user.id && "none"
                }}>
                  <span>
                    <div>
                      {user?.name?.at(0).toUpperCase() + user?.lastname?.at(0)}
                    </div>
                    <p>{user?.name + user?.lastname}</p>
                    <i>{user?.email}</i>
                  </span>
                  <button
                    onClick={() => {
                      sessionStorage.setItem("visitId", user.id);
                      nav("/userProfile");
                    }}
                  >
                    <FaRegPaperPlane />
                    <p>Visitar</p>
                  </button>
                </figure>
              ))}
          </article>
          {page < lastPage && (
            <button
              onClick={() => {
                setPage((prev) => prev + 1);
              }}
            >
              Ver mais
            </button>
          )}
        </>
      )}
    </section>
  );
}
