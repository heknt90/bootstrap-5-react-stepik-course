import { useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import './App.css';
import ModalAddGood from "./components/ModalAddGood/ModalAddGood";
import MenuSearchAndCreateGood from "./components/MenuSearchAndCreateGood/MenuSearchAndCreateGood";
import TotalPriceMenu from "./components/TotalPriceMenu/TotalPriceMenu";
import { getOrInitializeLocalStorageItem, saveItemToLocalStorage } from "./utils/localStorageUtilities"

const mySwal = withReactContent(Swal)

function App() {
  const [newGoodTitle, setNewGoodTitle] = useState("")
  const [newGoodPrice, setNewGoodPrice] = useState(0)
  const [newGoodsCount, setNewGoodsCount] = useState(1)
  const [searchInputText, setSearchInputOnChange] = useState("")
  const [goods, setGoods] = useState([])
  const [cartGoods, setCartGoods] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const newGoodRef = useRef(null)

  useEffect(() => {
    setGoods(getOrInitializeLocalStorageItem("goods", []))
  }, [])

  useEffect(() => {
    saveItemToLocalStorage("goods", goods)
  }, [goods])

  const goodSaveHandler = () => {
    if (newGoodTitle && newGoodsCount) {
      setNewGoodTitle("")
      setNewGoodPrice(0)
      setNewGoodsCount(1)
      setGoods(prev => [...prev, {name: newGoodTitle, price: newGoodPrice, count: newGoodsCount}])
      // saveItemToLocalStorage("goods", goods)
      const modal = Modal.getInstance(newGoodRef.current)
      modal.hide()
    } else {
      mySwal.fire({
        icon: "error",
        title: "Ошибка",
        text: "Пожалуйста, заполните все поля!"
      })
    }
  }

  const row1 = goods.map((item, index) => (
      <tr className="align-middle" key={index}>
        <td>{`${index+1}`}</td>
        <td className="name">{item.name}</td>
        <td className="price">{item.price}</td>
        <td>{item.count}</td>
        <td><button className="good_delete btn btn-danger" data-delete={index}>&#10006;</button></td>
        <td><button className="good_ btn btn-primary" data-good={index}>&#10149;</button></td>
      </tr>
    )
  )

  const row2 = cartGoods.map((item, index) => (
      <tr className="align-middle" key={index}>
        <td>{`${index+1}`}</td>
        <td className="price_name">{item.name}</td>
        <td className="price_one">{item.price}</td>
        <td className="price_count">{item.count}</td>
        <td className="price_discount"><input type="text" data-goodid={index+1} value={item.discount} min="0" max="100" /></td>
        <td>{item.count*item.price - item.count*item.price*item.discount*.01}</td>
        <td><button className="good_delete btn btn-danger" data-delete={index}>&#10006;</button></td>
      </tr>
    )
  )
  
  return (
    <div className="App container">
      <div className="row">
        <div className="col-xs-12 col-xxl-5">
          <div className="goods_box" id="goods">
            <MenuSearchAndCreateGood modalRef={newGoodRef} searchInputText={searchInputText} searchInputOnChange={setSearchInputOnChange} />
            <div className="table-responsive">
              <table className="goods table mt-3" id="table1" hidden={goods.length ? null : "hidden"}>
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
                  {row1}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-xxl-7">
          <div className="price_box">
            <TotalPriceMenu totalPrice={totalPrice} />
            <div className="table-responsive">
              <table className="price table mt-3" id="table2" hidden={goods.length ? null : "hidden"}>
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
                  {row2}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalAddGood newGoodRef={newGoodRef} goodSaveHandler={goodSaveHandler} goodTitle={newGoodTitle} goodTitleOnChange={setNewGoodTitle} goodPrice={newGoodPrice} goodPriceOnChange={setNewGoodPrice} goodsCount={newGoodsCount} goodsCountOnChange={setNewGoodsCount} />
    </div>
  );
}

export default App;
