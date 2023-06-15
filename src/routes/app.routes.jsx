import { Routes, Route } from "react-router-dom"

import { Home } from "../pages/home"
import { New } from "../pages/new"
import { Profile } from "../pages/profile"
import { Details } from "../pages/details"

export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
    )
}