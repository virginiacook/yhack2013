package com.canadianz.glowstress;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.content.Intent;

public class MainActivity extends Activity implements OnClickListener {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		Button btnA = (Button) findViewById(R.id.btn_add);
		btnA.setOnClickListener(this);
		Button btnD = (Button) findViewById(R.id.btn_delete);
		btnD.setOnClickListener(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}


	@Override
	public void onClick(View v) {
		// TODO Auto-generated method stub
		switch (v.getId()) {
			case R.id.btn_add:
				Intent intent = new Intent(this, AddReminder.class);
				startActivity(intent);
				
			case R.id.btn_delete:
				
			break;
		}
		
	}}
