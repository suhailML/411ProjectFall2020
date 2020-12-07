import React from 'react';
import User from './User'

class Sidebar extends React.Component {
    constructor(){
        super()
        this.state={
            friendExpand: false
        }
        this.expandlist = this.expandlist.bind(this)
    }

    expandlist() {
        this.setState(prev => 
            ({
                friendExpand: !prev.friendExpand,
            })
        )


        console.log(this.state.friendExpand)
    }


    render() {
        //inline styles can dynamically change styles, bothced example

        const iconSize = 27

        //Friend List
        const friends = this.props.friends.map(e => <User key={e.id} name={e.name} size={iconSize} self={false}/>)
        //what to expand friendlist size to 
        const heightFriendsList = {height: 'min(' + parseInt(this.state.friendExpand ? this.props.friends.length * (iconSize + 25) : (iconSize + 25)) + 'px, 40vh)'}


        return (
            <div className="sidebar">
                <h4> hi {this.props.name} </h4>
                {/*style prop takes an object for inline styles in JSX*/}
                <User key='777' name={'Chicken '+this.props.name} size={33} self={true}/>

                <h2> Friends</h2>
                <hr></hr>
                <div>
                    <div className={'friends' + (this.state.friendExpand ? '' : ' collapse' )} style={heightFriendsList}>
                        {friends}
                    </div>
                    <button onClick={this.expandlist}> click to {this.state.friendExpand ? 'collapse' : 'expand' }</button>
                </div>

                <h5>&gt;&gt; start a bulletin board chat or something</h5>
                
            </div>
        )
    }
}

export default Sidebar