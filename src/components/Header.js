import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ViewModule from 'material-ui/svg-icons/action/view-module'
import { white } from 'material-ui/styles/colors'
import FontIcon from 'material-ui/FontIcon'

export default class Header extends Component {
    render() {
        const { styles } = this.props;

        const style = {
            appBar: {
                position: 'fixed',
                top: 0,
                overflow: 'hidden',
                maxHeight: 57
            },
            menuButton: {
                marginLeft: 10
            },
            iconsRightContainer: {
                marginLeft: 20
            }
        };

        return (
            <div>
                <AppBar
                    style={{ ...styles, ...style.appBar }}
                    title={"Management"}
                    iconElementLeft={<FontIcon className="muidocs-icon-action-home" />}
                    iconElementRight={
                        <div style={style.iconsRightContainer}>
                            <IconMenu color={white}
                                iconButtonElement={
                                    <IconButton><ViewModule color={white} /></IconButton>
                                }
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            >
                                <Link to="/"><MenuItem key={1}>All</MenuItem></Link>
                                <Link to="/flow"><MenuItem key={2}>Flow</MenuItem></Link>
                                <Link to="/moisture"><MenuItem key={3}>Moisture</MenuItem></Link>
                                <Link to="/water"><MenuItem key={4}>water</MenuItem></Link>
                                <Link to="/turbidity"><MenuItem key={5}>turbidity</MenuItem></Link>                                
                            </IconMenu>
                        </div>
                    }
                />
            </div>
        )
    }
}