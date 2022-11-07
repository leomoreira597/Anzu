import { createDrawerNavigator } from '@react-navigation/drawer'
import TaskList from './screens/TaskList';


const drawer = createDrawerNavigator()

export default function Drawer(props){
    return(
        <drawer.Navigator initialRouteName='TaskList'>
            <drawer.Screen name="Hoje" component={TaskList} />
            <drawer.Screen name="Amanha" component={TaskList} />
            <drawer.Screen name="Semana" component={TaskList} />
            <drawer.Screen name="Mês" component={TaskList} />
        </drawer.Navigator>
    );
}