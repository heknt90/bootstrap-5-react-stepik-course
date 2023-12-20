import './MenuSearchAndCreateGood.css';

function MenuSearchAndCreateGood({searchInputText, searchInputOnChange, createNewGoodHandler, modalRef}) {
  return (
    <div className="menu">
      <input type="text" placeholder="Поиск" className="search" value={searchInputText} onChange={searchInputOnChange} />
      <button className="add btn btn-success" onClick={createNewGoodHandler}>&#10010;</button>
    </div>
  )
}

export default MenuSearchAndCreateGood