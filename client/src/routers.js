import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Routers = () => {
  const AddUser = lazy(() => import("./components/addUser"));
  const UserData = lazy(() => import("./components/userData"));
  return (
    <Suspense>
      <Routes>
        <Route exact path="/" element={<UserData />} />
        <Route exact path="/add-user" element={<AddUser />} />
        <Route exact path="/user-details" element={<UserData />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
