import React, {useEffect, useRef, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';

const CRUDScreen = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [lisData, setListData] = useState([]);
  const [id, setId] = useState(null);
  const [button, setButton] = useState('POST');
  const [deleteMode, setDeleteMode] = useState(false);

  const Item = ({author, title, id}) => {
    const tailwind = useTailwind();
    return (
      <Pressable
        style={tailwind(
          'bg-green-400 h-36 ml-8 mr-8 mt-10 justify-center rounded-md',
        )}
        onPress={() => selectItem(id, title, author)}>
        <Text style={tailwind('text-white ml-4 mb-4')}>{title}</Text>
        <Text style={tailwind('text-white ml-4 mt-4')}>{author}</Text>
      </Pressable>
    );
  };

  const renderItem = ({item}) => {
    return <Item title={item.title} author={item.author} id={item.id} />;
  };

  useEffect(() => {
    getData();
  }, []);

  const postData = () => {
    let formData = {
      title: title,
      author: author,
    };
    try {
      fetch('http://10.0.2.2:3000/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => {
          if (json.title != null || json.title !== '') {
            ToastAndroid.show(
              'Berhasil menyimpan data ke database!',
              ToastAndroid.SHORT,
            );
            setTitle('');
            setAuthor('');
            getData();
          } else {
            ToastAndroid.show(
              'Terjadi kesalahan! Harap coba lagi!',
              ToastAndroid.SHORT,
            );
          }
        });
    } catch (e) {
      console.log('Terjadi Error : ' + e);
      throw e;
    }
  };

  const updateData = () => {
    let formData = {
      id: id,
      title: title,
      author: author,
    };
    fetch(`http://10.0.2.2:3000/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(reponse => reponse.json())
      .then(json => {
        if (json.title !== '' || json.title != null) {
          setId(null);
          setTitle('');
          setAuthor('');
          setButton('POST');
          setDeleteMode(false);
          getData();
          ToastAndroid.show('Berhasil memperbarui data!', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Terjadi kesalahan!', ToastAndroid.SHORT);
        }
      });
  };

  const deleteData = () => {
    let formData = {
      id: id,
      author: author,
      title: title,
    };
    fetch(`http://10.0.2.2:3000/posts/${id}`, {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      response.json();
      setId(null);
      setTitle('');
      setAuthor('');
      setButton('POST');
      setDeleteMode(false);
      getData();
      ToastAndroid.show('Berhasil menghapus data!', ToastAndroid.SHORT);
    });
  };

  const onClick = () => {
    if (button === 'POST') {
      postData();
    } else {
      updateData();
    }
  };

  const getData = () => {
    fetch('http://10.0.2.2:3000/posts')
      .then(response => response.json())
      .then(json => {
        setListData(json);
      });
  };

  const selectItem = (id, title, author) => {
    setAuthor(author);
    setTitle(title);
    setId(id);
    setDeleteMode(true);
    setButton('Update');
    onScrollTop();
  };

  const mainScrollView = useRef();
  const onScrollTop = () => {
    mainScrollView.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const tailwind = useTailwind();
  //
  return (
    <ScrollView style={tailwind('h-full w-full bg-white')} ref={mainScrollView}>
      <Text style={tailwind('text-black font-bold text-lg mt-10 text-center')}>
        CRUD dengan Local API
      </Text>

      <View
        style={tailwind(
          'flex h-16 justify-center rounded-full ml-8 mr-8 mt-8 bg-slate-300',
        )}>
        <TextInput
          style={tailwind('text-black ml-4 mr-4')}
          placeholder="Masukkan Judul Postingan"
          onChangeText={text => setTitle(text)}
          value={title}
        />
      </View>
      <View
        style={tailwind(
          'flex h-16 justify-center rounded-full ml-8 mr-8 mt-4 bg-slate-300',
        )}>
        <TextInput
          style={tailwind('text-black ml-4 mr-4')}
          placeholder="Masukkan Nama Author Postingan"
          onChangeText={text => setAuthor(text)}
          value={author}
        />
      </View>
      <Pressable
        style={[
          tailwind(
            'mt-8 ml-8 mr-8 h-16 rounded-full flex justify-center items-center bg-cyan-400',
          ),
          {
            elevation: 10,
          },
        ]}
        onPress={() => onClick()}>
        <Text style={tailwind('text-white font-bold text-base')}>{button}</Text>
      </Pressable>
      {deleteMode && (
        <Pressable
          style={[
            tailwind(
              'mt-4 ml-8 mr-8 h-16 rounded-full flex justify-center items-center bg-cyan-400',
            ),
            {
              elevation: 10,
            },
          ]}
          onPress={() => deleteData()}>
          <Text style={tailwind('text-white font-bold text-base')}>Delete</Text>
        </Pressable>
      )}
      <View style={tailwind('border-b mt-2')} />
      <SafeAreaView style={tailwind('mt-4')}>
        <FlatList
          data={lisData}
          renderItem={renderItem}
          nestedScrollEnabled={true}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default CRUDScreen;
