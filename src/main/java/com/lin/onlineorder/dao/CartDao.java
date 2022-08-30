package com.lin.onlineorder.dao;

import com.lin.onlineorder.entity.Cart;
import com.lin.onlineorder.entity.OrderItem;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDao {

	@Autowired
	private SessionFactory sessionFactory;

	public void removeCartItem(int orderItemId) {
		Session session = null;
		try {
			session = sessionFactory.openSession();

			OrderItem orderItem = session.get(OrderItem.class, orderItemId);
			Cart cart = orderItem.getCart();
			cart.getOrderItemList().remove(orderItem);

			session.beginTransaction();
			session.delete(orderItem);
			session.getTransaction().commit();
		} catch(Exception ex) {
			ex.printStackTrace();
			if (session != null) {
				session.getTransaction().rollback();
			}
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	public void removeAllCartItem(Cart cart) {
		for (OrderItem orderItem : cart.getOrderItemList()) {
			removeCartItem(orderItem.getId());
		}
	}
}
