import React, { useState } from "react";
import AppRouter from './router/index'
import Grad from './components/Grad'

export default function App(props) {

  return (
    <div>
    <Grad/>
    <AppRouter/>
    </div>
  );
}
