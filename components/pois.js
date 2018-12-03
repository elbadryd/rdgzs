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
      img:"/static/restaurant.png"
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

      <table className="d-flex justify-content-center">
          {content.map((div, i) => {
            return <td scope="col" className="columns" style={{padding: '5px',
            justifyContent: 'center'}}>
              <img key ={i} onClick={this.props.setPois.bind(this, div.type)} src={div.img} />
              <div key={div.type} >{div.type}</div>
              </td>
          })}

        </table> 
    )
  }
}
export default PoiView
