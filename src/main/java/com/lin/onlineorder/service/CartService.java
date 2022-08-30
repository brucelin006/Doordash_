package com.lin.onlineorder.service;

import com.lin.onlineorder.dao.CartDao;
import com.lin.onlineorder.dao.CustomerDao;
import com.lin.onlineorder.entity.Cart;
import com.lin.onlineorder.entity.Customer;
import com.lin.onlineorder.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CartService {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private CartDao cartDao;

	public Cart getCart() {
		Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		Customer customer = customerService.getCustomer(username);

		if (customer != null) {
			Cart cart = customer.getCart();
			double totalPrice = 0;
			for (OrderItem orderItem : cart.getOrderItemList()) {
				totalPrice += orderItem.getPrice() * orderItem.getQuantity();
			}
			cart.setTotalPrice(totalPrice);
			return cart;
		}
		return new Cart();
	}

	public void clearCart() {
		Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
		String username = loggedInUser.getName();
		Customer customer = customerService.getCustomer(username);

		if (customer != null) {
			cartDao.removeAllCartItem(customer.getCart());
		}
	}
}
