import React from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "../../component/Menu"

export const Layout: React.FC = React.memo((): JSX.Element => {
    return(
        <div>
            <Menu/>
            <Outlet/>
        </div>
    )
})