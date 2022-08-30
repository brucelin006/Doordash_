package com.lin.onlineorder.service;

import com.lin.onlineorder.dao.OrderItemDao;
import com.lin.onlineorder.entity.Customer;
import com.lin.onlineorder.entity.MenuItem;
import com.lin.onlineorder.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private MenuInfoService menuInfoService;

	@Autowired
	private OrderItemDao orderItemDao;

	public void saveOrderItem(int menuId) {
		final OrderItem orderItem = new OrderItem();
		final MenuItem menuItem = menuInfoService.getMenuItem(menuId);

		Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		Customer customer = customerService.getCustomer(username);

		orderItem.setMenuItem(menuItem);
		orderItem.setCart(customer.getCart());
		orderItem.setQuantity(1);
		orderItem.setPrice(menuItem.getPrice());
		orderItemDao.saveOrderItem(orderItem);
	}
}
