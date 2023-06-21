import { Outlet } from 'react-router-dom'
import { MenuSettingBasicGood } from '../routes/MenuSettingBasicGood'

export const SettingManage = () => {
  return (
    <>
      <MenuSettingBasicGood />
      <Outlet />
    </>
  )
}
