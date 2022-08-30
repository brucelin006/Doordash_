package com.lin.onlineorder.service;

import com.lin.onlineorder.dao.MenuInfoDao;
import com.lin.onlineorder.entity.MenuItem;
import com.lin.onlineorder.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuInfoService {

	@Autowired
	private MenuInfoDao menuInfoDao;

	public List<Restaurant> getRestaurants() {
		return menuInfoDao.getRestaurants();
	}

	public List<MenuItem> getAllMenuItem(int restaurantId) {
		return menuInfoDao.getAllMenuItem(restaurantId);
	}

	public MenuItem getMenuItem(int menuItemId) {
		return menuInfoDao.getMenuItem(menuItemId);
	}
}
