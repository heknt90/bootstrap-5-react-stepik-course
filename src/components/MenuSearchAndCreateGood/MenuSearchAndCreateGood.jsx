import './MenuSearchAndCreateGood.css';

function MenuSearchAndCreateGood({searchInputText, searchInputOnChange}) {
  return (
    <div className="menu">
      <input type="text" placeholder="Поиск" className="search" value={searchInputText} onChange={e => searchInputOnChange(e.target.value)} />
      <button className="add btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">&#10010;</button>
    </div>
  )
}

export default MenuSearchAndCreateGood