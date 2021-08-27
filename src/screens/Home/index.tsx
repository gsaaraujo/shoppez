import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  ScrollView,
} from 'react-native';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import { theme } from '../../global/theme/styles';

import SearchSvg from '../../assets/images/search.svg';

import { useUser } from '../../hooks/useUser';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

import { AppProductType } from '../../context/userProvider';

import { Spacer } from '../../components/Spacer';
import { LogOut } from '../../components/LogOut';
import { Product } from '../../components/Product';
import { ModalView } from '../../components/ModalView';
import { CategoriesProduct } from '../../components/CategoriesProduct';

import {
  Container,
  Header,
  Title,
  SearchInputContent,
  SearchIcon,
  SearchInput,
  Profile,
  ProfileImage,
  LoadingFlatlist,
} from './styles';

export const Home = () => {
  const [products, setProducts] = useState<AppProductType[]>([]);
  const [productsFiltered, setProductsFiltered] = useState<AppProductType[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState('');
  const [productSearch, setProductSearch] = useState('');
  const [modalVisibility, setModalVisibility] = useState(false);

  const isProductSearchFirstRun = useRef(false);
  const isCategorySelectedFirstRun = useRef(false);

  const { user } = useAuth();
  const navigation: any = useNavigation();

  const { titleColor, primaryDark, subtitleColor } = theme.colors;
  const { titleFont100, subtitleFont } = theme.fonts;

  const categories = ['Sneakers', 'Slippers', 'T-shirts'];

  const defaultImage =
    'https://i.pinimg.com/736x/33/32/6d/33326dcddbf15c56d631e374b62338dc.jpg';

  useEffect(() => {
    if (isProductSearchFirstRun.current) {
      setIsLoading(true);

      const awaitsTyping = setTimeout(
        () => handleSearchOnStopTyping(productSearch),
        1000,
      );

      return () => clearTimeout(awaitsTyping);
    }

    isProductSearchFirstRun.current = true;
  }, [productSearch]);

  useEffect(() => {
    if (isCategorySelectedFirstRun.current) {
      setIsLoading(true);

      const awaitsCategory = setTimeout(
        () => handleSearchOnFilter(categorySelected),
        1000,
      );

      return () => clearTimeout(awaitsCategory);
    }

    isCategorySelectedFirstRun.current = true;
  }, [categorySelected]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot(querySnapshot => {
        const productsResult: any[] = [];

        querySnapshot.forEach(documentSnapshot => {
          productsResult.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setProducts(productsResult);
        setProductsFiltered(productsResult);
        setIsLoading(false);
        setCategorySelected('');
      });

    return () => subscriber();
  }, []);

  const handleLogOutModal = () => setModalVisibility(!modalVisibility);

  const handleCategorySelected = async (category: string) => {
    categorySelected === category
      ? setCategorySelected('')
      : setCategorySelected(category);
  };

  const handleProductSearch = (name: string) => setProductSearch(name);

  const handleSearchOnStopTyping = (productSearch: string) => {
    let productsCopy = products;
    const regex = new RegExp(productSearch, 'i');

    if (productSearch) {
      productsCopy = productsCopy.filter(each => each.name.match(regex));

      setProductsFiltered(productsCopy);
    } else {
      setProductsFiltered(products);
    }

    setIsLoading(false);
  };

  const handleSearchOnFilter = (categorySelected: string) => {
    let productsCopy = products;

    if (categorySelected) {
      productsCopy = productsCopy.filter(
        each => each.category === categorySelected.toLowerCase(),
      );

      setProductsFiltered(productsCopy);
    } else {
      setProductsFiltered(products);
    }
    setIsLoading(false);
  };

  const handleGoToProductDetails = (productDetails: AppProductType) =>
    navigation.navigate('ProductDetails', { productDetails: productDetails });

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      <Spacer height={20} />

      <Header>
        <SearchInputContent>
          <SearchIcon>
            <SearchSvg color={titleColor} />
          </SearchIcon>

          <SearchInput onChangeText={name => handleProductSearch(name)} />
        </SearchInputContent>

        <Profile
          style={({ pressed }) => pressed && { opacity: 0.3 }}
          onPress={handleLogOutModal}>
          <ProfileImage
            source={{ uri: user?.photoURL || defaultImage }}
            resizeMode='cover'
          />
        </Profile>
      </Header>

      <Spacer height={40} />

      <Title font={titleFont100} color={titleColor} size={16}>
        Categories
      </Title>

      <Spacer height={15} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 40, minHeight: 40 }}>
        {categories.map((category, index) => (
          <CategoriesProduct
            key={index}
            title={category}
            isSelected={category === categorySelected}
            handleOnPress={handleCategorySelected}
          />
        ))}
      </ScrollView>

      <Spacer height={40} />

      <Title font={titleFont100} color={titleColor} size={16}>
        Products
      </Title>

      <Spacer height={15} />

      {isLoading ? (
        <LoadingFlatlist>
          <ActivityIndicator color={primaryDark} size='large' />
        </LoadingFlatlist>
      ) : productsFiltered.length === 0 ? (
        <LoadingFlatlist>
          <Title
            font={subtitleFont}
            color={subtitleColor}
            size={18}
            alignSelf='center'>
            No products found =(
          </Title>
        </LoadingFlatlist>
      ) : (
        <FlatList
          data={productsFiltered}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <Product
              productInfo={item}
              handleOnPress={handleGoToProductDetails}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          ItemSeparatorComponent={() => <Spacer height={20} />}
        />
      )}

      <ModalView isVisible={modalVisibility}>
        <LogOut handleOnPress={handleLogOutModal} />
      </ModalView>
    </Container>
  );
};
