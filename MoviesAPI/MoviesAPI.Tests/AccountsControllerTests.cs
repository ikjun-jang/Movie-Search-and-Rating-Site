using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Moq;
using MoviesAPI.Controllers;
using Xunit;

namespace MoviesAPI.Tests
{
    public class AccountsControllerTests
    {
        private readonly Mock<UserManager<IdentityUser>> userManager;
        private readonly Mock<SignInManager<IdentityUser>> signInManager;
        private readonly Mock<IConfiguration> configuration;
        private readonly Mock<ApplicationDbContext> context;
        private readonly Mock<IMapper> mapper;
        //private readonly Mock<AccountsController> controller;
        //private readonly Mock<PaginationDTO> page;

        public AccountsControllerTests()
        {
            userManager = new Mock<UserManager<IdentityUser>>();
            signInManager = new Mock<SignInManager<IdentityUser>>();
            configuration = new Mock<IConfiguration>();
            context = new Mock<ApplicationDbContext>();
            mapper = new Mock<IMapper>();
            //controller = new Mock<AccountsController>();
            //page = new Mock<PaginationDTO>();
        }

        public AccountsController Service()
        {
            return new AccountsController(userManager.Object, signInManager.Object, 
                configuration.Object, context.Object, mapper.Object);
        }

        [Fact]
        public void MakeAdmin_Valid()
        {
            var service = Service();
            var userId = "jyj34690@naver.com";
            var result = service.MakeAdmin(userId);
            Assert.NotNull(result);
        }
    }
}