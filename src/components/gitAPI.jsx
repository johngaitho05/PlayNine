import React,{Component} from "react";
import Card from './Card'
import AddForm from './Form'

class ApiApp extends Component{
    state = {users:["johngaitho05","petehunt","codingforentrepreneurs","collinsnabali"]};
    render() {
        const cards = this.state.users.map(user => <Card key={user} user = {user}/> );
        return(
            <React.Fragment>
                <AddForm addCard={this.addCard}/>
                <div>
                    {cards}
                </div>
            </React.Fragment>
        )
    }
    addCard = (user) =>{
        if (this.state.users.includes(user)){alert("user already exists")
        }else{
            this.setState({users:this.state.users.concat(user)})
        }
    }

}

export default ApiApp