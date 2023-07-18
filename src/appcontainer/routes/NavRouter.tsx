import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import {
  ProductionManage,
  BladesManage,
  SettingManage,
  NewStack,
  AllProducts,
  StackPage,
} from "../index";
import { NewParamaterPage } from "../pages/NewParamaterPage";
import { NewOrder } from "../components/compProduction/NewOrder";

// import { NewBladeForm, NewMachine, NewStack, StorageBlade } from "../components";
// import { MachineryManage, BladesManage, Inventory, MondayList, ProductionManage  } from "../pages";

export const NavRouter = () => {
  return (
    <>
      <NavBar />
      <div className="container__app">
        <Routes>
          <Route
            path="production/manufacturing/*"
            element={<ProductionManage />}
          >
            <Route path="neworder" element={<NewOrder/>} />
            <Route path="newstack" element={<StackPage/>} />
            <Route path="scanstack" element={<NewStack/>} />
            {/* <Route path="stack_history" element={</>} /> */}
            {/* <Route path='charts' element={ < /> } /> */}
          </Route>
          <Route path="machinery/blades/*" element={<BladesManage />}>
            <Route path="newblade" element={<NewStack />} />
            {/* <Route path='status' element={ <StorageBlade /> } /> */}
          </Route>
          <Route path="setBasic/*" element={<SettingManage />}>
            <Route path="parameter" element={<NewParamaterPage/>} />
            <Route path="products" element={<AllProducts />} />
            {/* <Route path='status' element={ <StorageBlade /> } /> */}
          </Route>
        </Routes>
      </div>
    </>
  );
};

//   return (
//     <>
//       <NavBar />

//       <div className='container__app'>
//           <Routes>
//               <Route path="blades/*" element={ <BladesManage /> }>
//                   <Route path='new' element={ <NewBladeForm /> } />
//                   <Route path='storage' element={ <StorageBlade /> } />
//               </Route>
//               <Route path="machinery/*" element={ <MachineryManage /> }>
//                   <Route path='new' element={ <NewMachine /> } />
//                   {/* <Route path='status' element={ <StorageBlade /> } /> */}
//               </Route>
//               <Route path="manufacturing/*" element={ <ProductionManage /> }>
//                   <Route path='stack' element={ <NewStack /> } />
//                   {/* <Route path='status' element={ <StorageBlade /> } /> */}
//               </Route>
//               <Route path="production" element={ <ProductionManage  /> }/>

//           </Routes>
//         </div>
//     </>
//   )
