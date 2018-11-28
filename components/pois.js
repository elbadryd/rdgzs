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
      img:"/static/library.png"
  },
  {
    type:"food",
      img:"/static/restaurant.png"
  },
  {
    type:"parks",
      img:"/static/mountain.png"
  },
];
class PoiView extends React.Component {
  constructor(props) {
    super(props);
}

    render() {
    return (
      content.map(div=>{
        return <div onClick={this.props.setPois.bind(this, div.type)}><img src={div.img}></img></div>
      })
    )
  }
}
export default PoiView
