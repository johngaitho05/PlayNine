import React, {Component} from "react";

class AddForm extends Component{
    constructor(props) {
        super(props);
        this.user = React.createRef();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="github user" ref={this.user}/>
                <button>Add</button>
            </form>
        )
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        let user = this.user.current;
        if (user !== undefined){
          this.props.addCard(user.value);
        }
        user.value = "";
    }
}
export default AddForm