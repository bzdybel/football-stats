import React, { useEffect, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo } from '../screens/Demos';
// import action from './store';
import { GET_ALL_LEAGUES_INFORMATION } from '../store/constants/actionTypes';

export const api = axios.create();

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
  const { leagues } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();

  const fetchLeagueInformation = useCallback(async () => {
    api
      .get('https://api-football-standings.azharimm.site/leagues')
      .then(function (response) {
        saveData(response.data);
      });
  }, []);

  const saveData = data =>
    dispatch({ type: GET_ALL_LEAGUES_INFORMATION, payload: data });

  useEffect(() => {
    fetchLeagueInformation();
  }, [fetchLeagueInformation]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen name="List" component={List} />
      {leagues.map(e => {
        return (
          <MainStack.Screen
            name={e.slug}
            component={TextDemo}
            options={{ headerTitle: e.name }}
          />
        );
      })}
    </MainStack.Navigator>
  );
};
