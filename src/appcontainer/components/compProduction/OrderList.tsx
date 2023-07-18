import "../../../styles/page.css";

export const OrderList = () => {
  return (
    <div className="container__page">
      <div className="container__page--dropdowns">
        <div>
          <label>SELECT MACHINE:</label>
          <select
            name="itemt_name"
            className="select__field"
            // value={values.itemt_name}
            // onChange={onNewOrder}
          >
            <option value="">SAW 1</option>
            <option value="">SAW 2</option>
            <option value="">SAW 3</option>
          </select>
        </div>
        <div>
          <label>SELECT ORDER:</label>
          <select
            name="itemt_name"
            className="select__field"
            // value={values.itemt_name}
            // onChange={onNewOrder}
          >
            <option value="">ORDER 1</option>
            <option value="">ORDER 2</option>
            <option value="">ORDER 3</option>
          </select>
        </div>
      </div>
      <div className="container__page--info">
        <label>
          LAST ORDER
        </label>
      </div>
    </div>
  );
};
