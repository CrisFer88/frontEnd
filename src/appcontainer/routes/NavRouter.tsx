import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { ProductionManage, BladesManage } from "../pages";
import { NewStack } from "../components/compProduction/NewStack";
// import { NewBladeForm, NewMachine, NewStack, StorageBlade } from "../components";
// import { MachineryManage, BladesManage, Inventory, MondayList, ProductionManage  } from "../pages";

export const NavRouter = () => {
  return (
    <>
      <NavBar />
      <div className="container__app">
        <Routes>
          <Route path="production/manufacturing/*" element={<ProductionManage />}>
            <Route path="stack" element={<NewStack />} />
            {/* <Route path='status' element={ <StorageBlade /> } /> */}
          </Route>
          <Route path="machinery/blades/*" element={<BladesManage />}>
            <Route path="newblade" element={<NewStack />} />
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

