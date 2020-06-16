import React,{Component} from "react";
import $ from 'jquery/dist/jquery'

class Card extends Component{
    state = {};
    componentDidMount() {
        let component = this;
        $.get("https://api.github.com/users/"+this.props.user, function(data){
            component.setState(data)
        })
    }
    render() {
        return(
            <div>
                <img src={this.state.avatar_url} alt="Avatar" width='100' height={100}/>
                <h2>{this.state.name}</h2>
                <hr/>
            </div>
        )
    }
}

export default Card