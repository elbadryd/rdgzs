import { Nav, NavItem } from 'reactstrap';

const content = [{
  type: "hotel",
  img: "/static/bed.png"
},
{
  type:"history",
  img:"/static/history.png"
},
  {
    type:"museum",
      img:"/static/greek-temple.png"
  },
  {
    type:"food",
      img:"/static/food.png"
  },
  {
    type:"park",
      img:"/static/mountains.png"
  },
];
class PoiView extends React.Component {
  constructor(props) {
    super(props);
}
    render() {
    return (
      <div>
        <Nav id="nav" className="m-1">
        {content.map(item=>{
          return <NavItem id="navItem" className="m-1 rounded">
            <img id="pois" onClick={this.props.setPois.bind(this, item.type)} src={item.img} />
            <div>{item.type}</div>
          </NavItem>
        })}
      </Nav>
        </div>
    )
  }
}
export default PoiView
