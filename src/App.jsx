import { useState } from "react";
import './App.css';
import ModalAddGood from "./components/ModalAddGood/ModalAddGood";
import MenuSearchAndCreateGood from "./components/MenuSearchAndCreateGood/MenuSearchAndCreateGood";
import TotalPriceMenu from "./components/TotalPriceMenu/TotalPriceMenu";

function App() {
  const [newGoodTitle, setNewGoodTitle] = useState("")
  const [newGoodPrice, setNewGoodPrice] = useState(0)
  const [newGoodsCount, setNewGoodsCount] = useState(1)
  const [searchInputText, setSearchInputOnChange] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)

  return (
    <div className="App container">
      <div className="row">
        <div className="col-xs-12 col-xxl-5">
          <div className="goods_box" id="goods">
            <MenuSearchAndCreateGood searchInputText={searchInputText} searchInputOnChange={setSearchInputOnChange} />
            <div className="table-responsive">
              <table className="goods table mt-3" id="table1">
                <thead>
                  <tr className="table-primary align-middle">
                    <th data-type="number">№</th>
                    <th data-type="string">Название</th>
                    <th data-type="number">Цена, &#8381;</th>
                    <th data-type="number">Количество</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="list">

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-xxl-7">
          <div className="price_box">
            <TotalPriceMenu totalPrice={totalPrice} />
            <div className="table-responsive">
              <table className="price table mt-3" id="table2">
                <thead>
                  <tr className="table-primary align-middle">
                    <th data-type="number">№</th>
                    <th data-type="string">Название</th>
                    <th data-type="number">Цена/шт., &#8381;</th>
                    <th data-type="number">Количество</th>
                    <th data-type="number">Скидка, %</th>
                    <th data-type="number">Цена, &#8381;</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="cart">

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalAddGood goodTitle={newGoodTitle} goodTitleOnChange={setNewGoodTitle} goodPrice={newGoodPrice} goodPriceOnChange={setNewGoodPrice} goodsCount={newGoodsCount} goodsCountOnChange={setNewGoodsCount} />
    </div>
  );
}

export default App;
