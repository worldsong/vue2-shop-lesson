/**
* Created by Song on 2017/10/30.
*/
<template>
    <div class="hello">
      <body>
      <nav-header></nav-header>
      <nav-bread></nav-bread>
      <div class="accessory-result-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排序:</span>
            <a href="javascript:void(0)" class="default cur">默认</a>
            <a href="javascript:void(0)" class="price">价格 <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby">筛选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter" id="filter">
              <dl class="filter-price">
                <dt>价格区间:</dt>
                <dd><a href="javascript:void(0)">选择价格</a></dd>
                <dd>
                  <a href="javascript:void(0)">￥ 0 - 100 元</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li>
                    <div class="pic">
                      <a href="#"><img src="/static/1.jpg" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">小米电视4 55英寸</div>
                      <div class="price">3999</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
      </body>
    </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/goods-list.css'
  import NavHeader from './../components/NavHeader.vue'
  import NavFooter from './../components/NavFooter.vue'
  import NavBread from './../components/NavBread.vue'

    export default {
//        name: 'HelloWorld',
        data() {
            return {
                msg: 'Welcome to Vue2-shop'
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread
        }
    }
</script>

