import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
};

function createStore(state, _stateChanger) {
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        stateChanger(state, action);
        listeners.forEach((listener) => listener());
    };
    return { getState, dispatch, subscribe };
}

function renderApp(State) {
    renderTitle(State.title);
    renderContent(State.content);
}

function renderTitle(title) {
    const titleDOM = document.getElementById('title');
    titleDOM.innerHTML = title.text;
    titleDOM.style.color = title.color;
}

function renderContent(content) {
    const contentDOM = document.getElementById('content');
    contentDOM.innerHTML = content.text;
    contentDOM.style.color = content.color;
}

function stateChanger(state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text;
            break;
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color;
            break;
        default:
            break;
    }
}

const store = createStore(appState, stateChanger);
store.subscribe(() => renderApp(store.getState())); // 监听数据变化

renderApp(store.getState()); // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小🐶》' }); // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'green' }); // 修改标题颜色

