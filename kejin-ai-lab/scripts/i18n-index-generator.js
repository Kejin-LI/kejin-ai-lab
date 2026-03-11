const pagination = require('hexo-pagination');

hexo.config.index_generator = Object.assign({
  per_page: 10,
  order_by: '-date',
  pagination_dir: 'page'
}, hexo.config.index_generator);

hexo.extend.generator.register('index-i18n', function(locals) {
  const config = hexo.config;
  const languages = config.language;
  
  if (!languages || !Array.isArray(languages)) {
    return [];
  }

  const posts = locals.posts.sort(config.index_generator.order_by);
  const paginationDir = config.index_generator.pagination_dir;
  const perPage = config.index_generator.per_page;
  let result = [];

  languages.forEach((lang, index) => {
    // 过滤文章
    const langPosts = posts.filter(post => {
      return post.lang === lang;
    });
    
    // 生成路径
    // 如果是第一个语言（默认），路径为空（即根目录）
    // 其他语言路径为语言代码
    const base = (index === 0) ? '' : lang + '/';
    
    // 生成分页数据
    const data = pagination(base, langPosts, {
      perPage: perPage,
      layout: ['index', 'archive'],
      format: paginationDir + '/%d/',
      data: {
        __index: true,
        lang: lang // 传递当前语言给模板
      }
    });
    
    // 修补数据：Butterfly 主题依赖 page.posts.data
    data.forEach(item => {
        const currentPosts = item.data.posts;
        if (Array.isArray(currentPosts)) {
            item.data.posts = {
                data: currentPosts,
                length: currentPosts.length,
                each: function(callback) {
                    this.data.forEach((article, i) => callback(article, i));
                },
                toArray: function() {
                    return this.data;
                }
            };
        }
    });
    
    result = result.concat(data);
  });
  
  return result;
});
