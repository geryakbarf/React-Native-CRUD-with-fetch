import React, {useEffect, useState} from 'react';
import {Navigation} from 'react-native-navigation';
import {useTailwind} from 'tailwind-rn';
import {Image, Pressable, Text, ToastAndroid, View} from 'react-native';

const HomeScreen = () => {
  const [responseGet, setResponseGet] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
  });

  const [responsePost, setResponsePost] = useState({
    name: '',
    job: '',
  });

  const formData = {
    name: 'Gery Akbar Fauzi',
    job: 'Software Engineer',
  };

  const getData = () => {
    fetch('https://reqres.in/api/users/2')
      .then(response => response.json())
      .then(json => {
        setResponseGet(json.data);
        console.log(responseGet);
      });
  };

  const postData = () => {
    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(json => setResponsePost(json));
  };

  const tailwind = useTailwind();
  return (
    <View style={tailwind('bg-white h-full w-full')}>
      <Text style={tailwind('mt-10 text-center text-black')}>
        Call API dengan VanillaJS
      </Text>
      <Pressable
        style={tailwind(
          'flex rounded h-16 justify-center items-center ml-8 mr-8 mt-10 bg-cyan-500',
        )}
        onPress={() => getData()}>
        <Text style={tailwind('font-bold text-white')}>Get Data</Text>
      </Pressable>
      <Text style={tailwind('mt-2 text-black ml-8')}>Response Get Data</Text>
      <Text style={tailwind('mt-2 text-black ml-8 text-sm')}>
        Nama : {`${responseGet.first_name} ${responseGet.last_name}`}
      </Text>
      <Text style={tailwind('mt-2 text-black ml-8 text-sm')}>
        Email : {responseGet.email}
      </Text>
      <Image
        source={{uri: responseGet.avatar}}
        style={tailwind('mt-6 self-center rounded-full h-20 w-20')}
      />
      <View style={tailwind('mt-2 border-gray-400 border-b')} />
      <Pressable
        style={tailwind(
          'mt-2 h-16 bg-cyan-500 flex justify-center items-center ml-8 mr-8',
        )}
        onPress={() => postData()}>
        <Text style={tailwind('text-white font-bold')}>Post Data</Text>
      </Pressable>
      <Text style={tailwind('mt-2 text-black ml-8')}>Response Post Data</Text>
      <Text style={tailwind('mt-2 text-black ml-8 text-sm')}>
        Nama : {responsePost.name}
      </Text>
      <Text style={tailwind('mt-2 text-black ml-8 text-sm')}>
        Pekerjaan : {responsePost.job}
      </Text>
    </View>
  );
};

export default HomeScreen;
