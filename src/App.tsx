import React, {useState} from 'react';
import './App.css';
import {Button, Paper, styled} from "@mui/material";


function App() {
    const [items, setItems] = useState([
        {id: 1, group: "users", value: "Alex"},
        {id: 2, group: "users", value: "Jhon"},
        {id: 3, group: "users", value: "Matthew"},
        {id: 4, group: "users", value: "Cris"},
        {id: 5, group: "mentors", value: "Anna"},
        {id: 6, group: "mentors", value: "Alisa"},
        {id: 7, group: "mentors", value: "Karolina"},
    ]);
    const [dragData, setDragData] = useState<any>({});
    const [groups, setGroups] = useState<Array<string>>(['users', 'mentors']);


    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number, group: string) => {
        setDragData({id: id, initialGroup: group});
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    const changeCategory = (itemId: number, group: string) => {
        const newItems = [...items];
        newItems[itemId - 1].group = group;
        setItems([...newItems]);
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, group: string) => {
        const selected = dragData.id;
        changeCategory(selected, group);
    };

    const addNewGroup = () => {
        setGroups([...groups, `random${groups.length}`])
    }
    const addNewUser = () => {
        setItems([...items, {id: items.length+1, group: "users", value: `random user ${items.length}`}])
    }

    return (
        <>
            <HeaderContainer>
            <Button variant={"contained"} color={"primary"} onClick={addNewGroup}>Add group</Button>
            <Button variant={"contained"} color={"success"} onClick={addNewUser}>Add user</Button>
            </HeaderContainer>
            <RootContainer>
                {groups.map((group) => (
                    <UsersContainer
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, group)}
                        key={group}>
                        <h2>{group}</h2>
                        <div>
                            {items
                                .filter((item) => item.group === group)
                                .map((item) => (
                                    <Item
                                        key={item.id}
                                        elevation={10}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, item.id, group)}>
                                        {item.value}
                                    </Item>
                                ))}
                        </div>
                    </UsersContainer>
                ))}
            </RootContainer>
        </>
    );
}

export default App;

const HeaderContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  margin: 20px auto;
`
const RootContainer = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  width: 80%;
  margin: 60px auto;
`
const UsersContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35%;
  margin: 20px;
  padding: 20px;

  h2 {
    margin: 0;
  }

  div {
    width: 80%;
    padding: 20px 0 20px 0;
    margin: 20px;
  }
`
const Item = styled(Paper)`
  text-align: center;
  border-radius: 30px;
  padding: 4px 10px 4px 10px;
  width: 70%;
  height: 30px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 12px 15px rgba(13, 129, 219, 0.27);
  }


`

