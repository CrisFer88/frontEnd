
import { Outlet } from 'react-router-dom'
import { MenuProduction } from '../routes/MenuProduction'

export const ProductionManage = () => {
  
  return (
    <>
      <MenuProduction />
      <Outlet />
      
    </>
  )
}