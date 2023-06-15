import { Outlet } from "react-router-dom"
import { MenuBlades  } from "../routes/MenuBlades"


export const BladesManage = () => {
  return (
    <>       
        <MenuBlades />
        
        <Outlet/>
        
    </>
  )
}
