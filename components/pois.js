import { Nav, NavItem } from 'reactstrap';

const content = [{
  type: "hotels",
  img: "/static/bed.png"
},
{
  type:"history",
  img:"/static/history.png"
},
  {
    type:"museums",
      img:"/static/greek-temple.png"
  },
  {
    type:"food",
      img:"/static/food.png"
  },
  {
    type:"parks",
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
            <img onClick={this.props.setPois.bind(this, item.type)} src={item.img} />
            <div>{item.type}</div>
          </NavItem>
        })}
      </Nav>
        </div>
    )
  }
}
export default PoiView
