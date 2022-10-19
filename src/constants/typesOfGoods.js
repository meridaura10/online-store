import Pc from "../img/Pc";
import Tool from "../img/Tool";
import Washer from "../img/Washer";
import Clothes from '../img/Clothes'
import Dot from "../img/Dot";
import Books from "../img/Books";

export const TYPES_OF_GOODS = [
    {
        name: 'все',
        img: <Dot />,
        key: 'all'
    },
    {
        name: 'Ноутбуки та комп’ютери',
        img: <Pc />,
        key: 'laptopsAndComputers'
    },
    {
        name: 'Побутова техніка',
        img: <Washer />,
        key: 'householdAppliances'
    },
    {
        name: 'інструменти',
        img: <Tool />,
        key: 'tool'
    },
    {
        name: 'одяг',
        img:  <Clothes />,
        key: 'clothes'
    },
    {
        name: 'книги',
        img:  <Books />,
        key: 'books'
    },
]